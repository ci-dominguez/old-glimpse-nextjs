const ColorCardSkeleton = () => {
  return (
    <div className='flex flex-col'>
      <div className='w-full aspect-square rounded bg-neutral-300 animate-pulse' />
      <div className='flex items-center justify-center h-6 mt-1'>
        <div className='w-4 h-4 rounded-full bg-neutral-300 animate-pulse' />
      </div>
    </div>
  );
};

export default ColorCardSkeleton;
