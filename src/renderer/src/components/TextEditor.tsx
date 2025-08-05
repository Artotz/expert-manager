// utils/textEditor.tsx (ou em components se preferir)
import type { RenderEditCellProps } from 'react-data-grid'

function autoFocusAndSelect(input: HTMLInputElement | null) {
  input?.focus()
  input?.select()
}

export default function textEditor<TRow, TSummaryRow>({
  row,
  column,
  onRowChange,
  onClose
}: RenderEditCellProps<TRow, TSummaryRow>) {
  return (
    <input
      className="w-full h-full px-1 border-2 border-gray-300 focus:border-blue-500 outline-none"
      ref={autoFocusAndSelect}
      value={row[column.key as keyof TRow] as unknown as string}
      onChange={(e) => onRowChange({ ...row, [column.key]: e.target.value })}
      onBlur={() => onClose(true, false)}
    />
  )
}
