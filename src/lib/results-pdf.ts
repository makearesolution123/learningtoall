import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { submitAttempt } from "./practice.functions";

type Result = Awaited<ReturnType<typeof submitAttempt>>;

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function generateResultsPdf(result: Result) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 48;

  // Header band
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageW, 96, "F");
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("SAT Practice Test Report", margin, 44);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(result.testTitle, margin, 66);
  doc.setFontSize(9);
  doc.text(new Date().toLocaleString(), margin, 82);

  // Meta
  doc.setTextColor(15, 23, 42);
  let y = 128;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  if (result.studentName) {
    doc.text(`Student: ${result.studentName}`, margin, y);
    y += 16;
  }
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Time remaining at submission: ${fmtTime(result.timeRemainingSeconds)}${result.autoSubmitted ? " (auto-submitted)" : ""}`,
    margin,
    y,
  );
  y += 24;

  // Score cards
  const cards = [
    { label: "Score", value: `${result.score} / ${result.total}` },
    { label: "Percentage", value: `${result.percentage}%` },
    { label: "Correct", value: String(result.correct) },
    { label: "Incorrect", value: String(result.incorrect) },
    { label: "Unanswered", value: String(result.unanswered) },
    { label: "Flagged", value: String(result.flaggedCount) },
  ];
  const cardW = (pageW - margin * 2 - 10 * 2) / 3;
  const cardH = 56;
  cards.forEach((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = margin + col * (cardW + 10);
    const yy = y + row * (cardH + 10);
    doc.setFillColor(239, 246, 255);
    doc.roundedRect(x, yy, cardW, cardH, 8, 8, "F");
    doc.setTextColor(59, 91, 219);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(c.label.toUpperCase(), x + 12, yy + 18);
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(15);
    doc.text(c.value, x + 12, yy + 40);
  });
  y += cardH * 2 + 10 + 20;

  // Breakdown table
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text("Question-by-Question Breakdown", margin, y);
  y += 10;

  autoTable(doc, {
    startY: y,
    margin: { left: margin, right: margin },
    head: [["#", "Question", "Your Answer", "Correct", "Result"]],
    body: result.breakdown.map((b) => {
      const student = b.studentAnswer
        ? `${b.studentAnswer}. ${b.studentAnswerText ?? ""}`
        : "—";
      const correct = `${b.correctAnswer}. ${b.correctAnswerText}`;
      const status = b.isCorrect
        ? "Correct"
        : b.studentAnswer
          ? "Incorrect"
          : "Unanswered";
      return [
        String(b.position) + (b.flagged ? " *" : ""),
        b.prompt,
        student,
        correct,
        status,
      ];
    }),
    styles: { fontSize: 9, cellPadding: 6, valign: "top", overflow: "linebreak" },
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { cellWidth: 32, halign: "center" },
      1: { cellWidth: "auto" },
      2: { cellWidth: 90 },
      3: { cellWidth: 90 },
      4: { cellWidth: 60, halign: "center" },
    },
    didParseCell: (data) => {
      if (data.section === "body" && data.column.index === 4) {
        const v = data.cell.raw as string;
        if (v === "Correct") data.cell.styles.textColor = [22, 163, 74];
        else if (v === "Incorrect") data.cell.styles.textColor = [220, 38, 38];
        else data.cell.styles.textColor = [107, 114, 128];
      }
    },
  });

  const finalY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y;
  if (finalY < doc.internal.pageSize.getHeight() - 40) {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text("* Flagged for review", margin, finalY + 18);
  }

  const safeName = (result.studentName || "student").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const date = new Date().toISOString().slice(0, 10);
  doc.save(`sat-practice-report-${safeName}-${date}.pdf`);
}
