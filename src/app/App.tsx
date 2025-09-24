import { LeftSidebar } from '@/components/LeftSidebar'
import { RightPanel } from '@/components/RightPanel'
import { AppHeader } from '@/components/AppHeader'
import { EditorCanvas } from '@/components/EditorCanvas'

export default function App() {
  return (
    <div className="h-dvh flex flex-col">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <main className="flex-1 grid grid-rows-[1fr] place-items-center bg-neutral-900">
          <EditorCanvas />
        </main>
        <RightPanel />
      </div>
    </div>
  )
}
