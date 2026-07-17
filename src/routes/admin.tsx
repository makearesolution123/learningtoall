import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Save, Loader2, ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import {
  adminAddQuestion,
  adminCreateTest,
  adminDeleteQuestion,
  adminDeleteTest,
  adminGetTest,
  adminListTests,
  adminUpdateQuestion,
  adminUpdateTest,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — SAT Prep Studio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="min-h-dvh bg-muted/30">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
            <p className="text-sm text-muted-foreground">Manage tests and questions.</p>
          </div>
        </div>
        {selected ? (
          <TestEditor testId={selected} onBack={() => setSelected(null)} />
        ) : (
          <TestList onOpen={setSelected} />
        )}
      </main>
    </div>
  );
}

function TestList({ onOpen }: { onOpen: (id: string) => void }) {
  const list = useServerFn(adminListTests);
  const create = useServerFn(adminCreateTest);
  const del = useServerFn(adminDeleteTest);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-tests"], queryFn: () => list() });
  const [title, setTitle] = useState("");
  const [mins, setMins] = useState(20);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-lg font-semibold">Tests</h2>
        {isLoading && <div className="mt-4 text-sm text-muted-foreground">Loading…</div>}
        <ul className="mt-4 divide-y divide-border">
          {(data ?? []).map((t) => (
            <li key={t.id} className="flex items-center justify-between py-3">
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-xs text-muted-foreground">
                  {Math.round(t.duration_seconds / 60)} min · {t.is_active ? "Active" : "Inactive"}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onOpen(t.id)}
                  className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted"
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    if (!confirm("Delete this test and all its questions?")) return;
                    await del({ data: { testId: t.id } });
                    qc.invalidateQueries({ queryKey: ["admin-tests"] });
                    toast.success("Test deleted");
                  }}
                  className="rounded-lg px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-lg font-semibold">New Test</h2>
        <div className="mt-4 grid gap-3">
          <label className="text-xs font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <label className="text-xs font-medium">Duration (minutes)</label>
          <input
            type="number"
            value={mins}
            onChange={(e) => setMins(parseInt(e.target.value) || 0)}
            className="rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
          <button
            disabled={!title.trim() || mins < 1}
            onClick={async () => {
              await create({ data: { title: title.trim(), durationSeconds: mins * 60 } });
              setTitle("");
              qc.invalidateQueries({ queryKey: ["admin-tests"] });
              toast.success("Test created");
            }}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft hover:bg-primary/90 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" /> Create
          </button>
        </div>
      </div>
    </div>
  );
}

function TestEditor({ testId, onBack }: { testId: string; onBack: () => void }) {
  const getT = useServerFn(adminGetTest);
  const updT = useServerFn(adminUpdateTest);
  const addQ = useServerFn(adminAddQuestion);
  const updQ = useServerFn(adminUpdateQuestion);
  const delQ = useServerFn(adminDeleteQuestion);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-test", testId],
    queryFn: () => getT({ data: { testId } }),
  });

  if (isLoading || !data) {
    return (
      <div className="grid place-items-center rounded-2xl border border-border bg-card p-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to tests
      </button>

      <TestMetaEditor test={data.test} onSave={async (m) => {
        await updT({ data: { testId, ...m } });
        qc.invalidateQueries({ queryKey: ["admin-test", testId] });
        qc.invalidateQueries({ queryKey: ["admin-tests"] });
        toast.success("Saved");
      }} />

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h2 className="text-lg font-semibold">Questions ({data.questions.length})</h2>
        <div className="mt-4 space-y-4">
          {data.questions.map((q) => (
            <QuestionRow
              key={q.id}
              q={q}
              onSave={async (u) => {
                await updQ({ data: { questionId: q.id, testId, ...u } });
                qc.invalidateQueries({ queryKey: ["admin-test", testId] });
                toast.success("Question saved");
              }}
              onDelete={async () => {
                if (!confirm("Delete this question?")) return;
                await delQ({ data: { questionId: q.id } });
                qc.invalidateQueries({ queryKey: ["admin-test", testId] });
              }}
            />
          ))}
        </div>
        <NewQuestion
          onCreate={async (u) => {
            await addQ({ data: { testId, ...u } });
            qc.invalidateQueries({ queryKey: ["admin-test", testId] });
            toast.success("Question added");
          }}
        />
      </div>
    </div>
  );
}

function TestMetaEditor({
  test,
  onSave,
}: {
  test: { title: string; description: string | null; duration_seconds: number; is_active: boolean };
  onSave: (m: { title: string; description: string; durationSeconds: number; isActive: boolean }) => Promise<void>;
}) {
  const [title, setTitle] = useState(test.title);
  const [desc, setDesc] = useState(test.description ?? "");
  const [mins, setMins] = useState(Math.round(test.duration_seconds / 60));
  const [active, setActive] = useState(test.is_active);
  const [saving, setSaving] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h2 className="text-lg font-semibold">Test details</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Field label="Title"><input value={title} onChange={(e) => setTitle(e.target.value)} className="input" /></Field>
        <Field label="Duration (minutes)">
          <input type="number" value={mins} onChange={(e) => setMins(parseInt(e.target.value) || 0)} className="input" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Description">
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={2} className="input" />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} /> Active
        </label>
      </div>
      <button
        disabled={saving}
        onClick={async () => { setSaving(true); try { await onSave({ title, description: desc, durationSeconds: mins * 60, isActive: active }); } finally { setSaving(false); } }}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft hover:bg-primary/90"
      >
        <Save className="h-4 w-4" /> Save
      </button>
      <style>{`.input { width:100%; border-radius:0.75rem; border:1px solid var(--input); background:var(--background); padding:0.5rem 0.75rem; font-size:0.875rem; outline:none; } .input:focus{border-color:var(--primary);}`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

function QuestionRow({
  q,
  onSave,
  onDelete,
}: {
  q: { id: string; position: number; prompt: string; choice_a: string; choice_b: string; choice_c: string; choice_d: string; correct_answer: string };
  onSave: (u: { prompt: string; choiceA: string; choiceB: string; choiceC: string; choiceD: string; correctAnswer: "A" | "B" | "C" | "D"; position: number }) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [f, setF] = useState({
    prompt: q.prompt, choiceA: q.choice_a, choiceB: q.choice_b, choiceC: q.choice_c, choiceD: q.choice_d,
    correctAnswer: q.correct_answer as "A" | "B" | "C" | "D", position: q.position,
  });

  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">Position {q.position}</span>
        <button onClick={onDelete} className="rounded p-1 text-destructive hover:bg-destructive/10">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <textarea
        value={f.prompt} onChange={(e) => setF({ ...f, prompt: e.target.value })}
        rows={2}
        className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
      />
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {(["A", "B", "C", "D"] as const).map((L) => {
          const key = `choice${L}` as "choiceA";
          return (
            <div key={L} className="flex items-center gap-2">
              <label className="flex items-center gap-1 text-xs">
                <input type="radio" name={`c-${q.id}`} checked={f.correctAnswer === L} onChange={() => setF({ ...f, correctAnswer: L })} />
                {L}
              </label>
              <input
                value={f[key]}
                onChange={(e) => setF({ ...f, [key]: e.target.value })}
                className="flex-1 rounded-lg border border-input bg-background px-2 py-1.5 text-sm focus:border-primary focus:outline-none"
              />
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <label className="text-xs">Position</label>
        <input
          type="number" value={f.position}
          onChange={(e) => setF({ ...f, position: parseInt(e.target.value) || 1 })}
          className="w-20 rounded-lg border border-input bg-background px-2 py-1 text-sm"
        />
        <button
          onClick={() => onSave(f)}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Save className="h-3.5 w-3.5" /> Save
        </button>
      </div>
    </div>
  );
}

function NewQuestion({
  onCreate,
}: {
  onCreate: (u: { prompt: string; choiceA: string; choiceB: string; choiceC: string; choiceD: string; correctAnswer: "A" | "B" | "C" | "D" }) => Promise<void>;
}) {
  const [f, setF] = useState<{ prompt: string; choiceA: string; choiceB: string; choiceC: string; choiceD: string; correctAnswer: "A" | "B" | "C" | "D" }>({ prompt: "", choiceA: "", choiceB: "", choiceC: "", choiceD: "", correctAnswer: "A" });
  const valid = f.prompt && f.choiceA && f.choiceB && f.choiceC && f.choiceD;
  return (
    <div className="mt-6 rounded-xl border border-dashed border-border p-4">
      <div className="text-sm font-medium">Add question</div>
      <textarea
        placeholder="Question prompt"
        value={f.prompt}
        onChange={(e) => setF({ ...f, prompt: e.target.value })}
        rows={2}
        className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
      />
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {(["A", "B", "C", "D"] as const).map((L) => {
          const key = `choice${L}` as "choiceA";
          return (
            <div key={L} className="flex items-center gap-2">
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="radio" name="new-correct" checked={f.correctAnswer === L}
                  onChange={() => setF({ ...f, correctAnswer: L })}
                /> {L}
              </label>
              <input
                placeholder={`Choice ${L}`}
                value={f[key]}
                onChange={(e) => setF({ ...f, [key]: e.target.value })}
                className="flex-1 rounded-lg border border-input bg-background px-2 py-1.5 text-sm focus:border-primary focus:outline-none"
              />
            </div>
          );
        })}
      </div>
      <button
        disabled={!valid}
        onClick={async () => {
          await onCreate(f);
          setF({ prompt: "", choiceA: "", choiceB: "", choiceC: "", choiceD: "", correctAnswer: "A" });
        }}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
      >
        <Plus className="h-3.5 w-3.5" /> Add question
      </button>
    </div>
  );
}
