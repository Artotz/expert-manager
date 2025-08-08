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
      style={{
        width: '100%',
        height: '100%',
        paddingLeft: '0.25rem',
        paddingRight: '0.25rem',
        borderWidth: '2px',
        borderColor: '#D1D5DB',
        outline: 'none'
      }}
      ref={autoFocusAndSelect}
      value={row[column.key as keyof TRow] as unknown as string}
      onChange={(e) => onRowChange({ ...row, [column.key]: e.target.value })}
      onBlur={() => onClose(true, false)}
    />
  )
}
