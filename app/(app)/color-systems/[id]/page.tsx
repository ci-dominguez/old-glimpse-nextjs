import PaletteDisplay from '@/components/PaletteDisplay';

const ColorSystemDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>Color system details 🙂</h1>
      <PaletteDisplay paletteId={params.id} />
    </div>
  );
};

export default ColorSystemDetailsPage;
