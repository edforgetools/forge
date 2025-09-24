import { composeAndExport } from '@/features/export/exportImage'
import { useEditorStore } from '@/lib/store'

export function AppHeader() {
  const state = useEditorStore()
  async function doExport() {
    if (!state.capturedFrame || !state.crop) return
    const blob = await composeAndExport(
      state.capturedFrame,
      state.crop,
      state.overlays,
      'image/jpeg',
    )
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const ts = new Date().toISOString().slice(0, 16).replace(/[:T]/g, '')
    a.href = url
    a.download = `forge-thumb-${ts}.jpg`
    a.click()
    URL.revokeObjectURL(url)
  }
  return (
    <header className="h-12 border-b border-neutral-800 flex items-center px-3 gap-3">
      <div className="w-6 h-6 rounded bg-brand-500" />
      <h1 className="font-semibold">Forge</h1>
      <div className="ml-auto flex gap-2">
        <button className="px-3 py-1 rounded bg-neutral-800 hover:bg-neutral-700">
          New
        </button>
        <button className="px-3 py-1 rounded bg-neutral-800 hover:bg-neutral-700">
          Import
        </button>
        <button onClick={doExport} className="px-3 py-1 rounded bg-brand-600">
          Export
        </button>
      </div>
    </header>
  )
}
