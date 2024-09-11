import PaletteDisplay from '@/components/PaletteDisplay';

const PaletteDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>palette details 🙂</h1>
      <PaletteDisplay paletteId={params.id} />
    </div>
  );
};

export default PaletteDetailsPage;
