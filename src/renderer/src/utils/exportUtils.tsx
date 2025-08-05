// lembrar de flushSync e disableVirtualization

export function exportToCsv(gridEl: HTMLDivElement, fileName: string) {
  const { head, body, foot } = getGridContent(gridEl);
  const content = [...head, ...body, ...foot]
    .map((cells) => cells.map(serialiseCellValue).join(","))
    .join("\n");

  downloadFile(
    fileName,
    new Blob([content], { type: "text/csv;charset=utf-8;" })
  );
}

function getGridContent(gridEl: HTMLDivElement) {
  return {
    head: getRows(".rdg-header-row"),
    body: getRows(".rdg-row:not(.rdg-summary-row)"),
    foot: getRows(".rdg-summary-row"),
  };

  function getRows(selector: string) {
    return Array.from(gridEl.querySelectorAll<HTMLDivElement>(selector)).map(
      (gridRow) => {
        return Array.from(
          gridRow.querySelectorAll<HTMLDivElement>(".rdg-cell")
        ).map((gridCell) => gridCell.innerText);
      }
    );
  }
}

function serialiseCellValue(value: unknown) {
  if (typeof value === "string") {
    const formattedValue = value.replace(/"/g, '""');
    return formattedValue.includes(",")
      ? `"${formattedValue}"`
      : formattedValue;
  }
  return value;
}

function downloadFile(fileName: string, data: Blob) {
  const downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  const url = URL.createObjectURL(data);
  downloadLink.href = url;
  downloadLink.click();
  URL.revokeObjectURL(url);
}
