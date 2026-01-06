export function DashboardPreview() {
  return (
    <div className="hidden lg:flex items-center justify-center h-full bg-[#0E0A1A] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#6D28D9]/5 via-[#8B5CF6]/3 to-transparent" />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto p-8">
        <div className="bg-[#18132E] rounded-lg border border-[rgba(109,40,217,0.15)] overflow-hidden shadow-2xl">
          <div className="bg-[#141026] px-6 py-3 border-b border-[rgba(109,40,217,0.15)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#9CA3AF]/30" />
                <div className="w-3 h-3 rounded-full bg-[#9CA3AF]/30" />
                <div className="w-3 h-3 rounded-full bg-[#9CA3AF]/30" />
              </div>
              <div className="text-sm text-[#9CA3AF] font-mono">corsihub.app</div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-6 bg-[#141026] rounded w-32 mb-2" />
                <div className="h-4 bg-[#141026] rounded w-48" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#141026] rounded-lg p-4 border border-[rgba(109,40,217,0.15)]">
                <div className="h-3 bg-[#0E0A1A] rounded w-20 mb-3" />
                <div className="h-8 bg-[#0E0A1A] rounded w-24 mb-2" />
                <div className="h-3 bg-[#0E0A1A]/50 rounded w-32" />
              </div>
              <div className="bg-[#141026] rounded-lg p-4 border border-[rgba(109,40,217,0.15)]">
                <div className="h-3 bg-[#0E0A1A] rounded w-20 mb-3" />
                <div className="h-8 bg-[#0E0A1A] rounded w-24 mb-2" />
                <div className="h-3 bg-[#0E0A1A]/50 rounded w-32" />
              </div>
            </div>
            
            <div className="bg-[#141026] rounded-lg p-4 border border-[rgba(109,40,217,0.15)]">
              <div className="h-3 bg-[#0E0A1A] rounded w-24 mb-4" />
              <div className="space-y-2">
                <div className="h-2 bg-[#0E0A1A] rounded w-full" />
                <div className="h-2 bg-[#0E0A1A] rounded w-5/6" />
                <div className="h-2 bg-[#0E0A1A] rounded w-4/6" />
                <div className="h-2 bg-[#0E0A1A] rounded w-5/6" />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="h-20 bg-[#141026] rounded border border-[rgba(109,40,217,0.15)]" />
              <div className="h-20 bg-[#141026] rounded border border-[rgba(109,40,217,0.15)]" />
              <div className="h-20 bg-[#141026] rounded border border-[rgba(109,40,217,0.15)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

