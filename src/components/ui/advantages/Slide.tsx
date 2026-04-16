import type { advantagesType } from '../../../types/advantagesTypes.ts'

interface SlideProps {
  item: advantagesType
}

const Slide = ({ item }: SlideProps) => {
  const Icon = item.icon

  return (
    <div className="relative w-full min-h-[320px] sm:min-h-96 flex flex-col justify-center px-4 sm:px-8 md:px-12 pb-14 pt-11 overflow-hidden">
    {/* Glow top-right */}
    <div
      className="absolute -top-24 -right-16 w-64 h-64 sm:w-96 sm:h-96 rounded-full pointer-events-none
                 bg-[radial-gradient(circle,rgba(255,100,0,0.20)_0%,transparent_70%)]"
    />

    {/* Glow bottom-left */}
    <div
      className="absolute -bottom-32 -left-10 w-64 h-64 sm:w-80 sm:h-80 rounded-full pointer-events-none
                 bg-[radial-gradient(circle,rgba(200,60,0,0.14)_0%,transparent_70%)]"
    />

    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10">
      <div className="flex-1 max-w-xl text-center sm:text-left">
        <span
          className="inline-block mb-3 sm:mb-4 px-3 py-1 font-mono text-[10px] tracking-[4px] uppercase
                     text-orange-400 border border-orange-500/40 rounded-sm"
        >
          {item.label}
        </span>

        <h2 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-white">
          {item.title}
        </h2>

        <p className="text-sm sm:text-base leading-relaxed text-white/55 max-w-md mx-auto sm:mx-0">
          {item.description}
        </p>
      </div>

      <div className="relative flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-orange-500/20" />

        <div
          className="absolute inset-0 rounded-full border border-dashed border-orange-500/20 animate-spin [animation-duration:12s]"
        />

        <div
          className="w-24 h-24 sm:w-26 sm:h-26 md:w-28 md:h-28 rounded-full flex items-center justify-center border border-orange-500/40 bg-orange-500/10"
        >
          <Icon size={36} className="text-orange-400 sm:size-10 md:size-[46px]" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  </div>
    
  )
}

export default Slide