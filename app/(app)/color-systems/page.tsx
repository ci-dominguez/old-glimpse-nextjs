import { getUserColorSystems } from '@/utils/apiUtils/colorSystemUtils';
import { authenticateUser } from '@/utils/apiUtils/authUtils';
import ColorSystemCard from '@/components/cards/ColorSystemCard';
import { ColorSystemCard as SystemCardType } from '@/utils/types/interfaces';

export default async function ColorSystemsPage() {
  const user = await authenticateUser();
  const systems: SystemCardType[] = await getUserColorSystems(user.id);

  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach'>
        <div className='flex flex-col space-y-6 text-center'>
          <h1 className='text-4xl font-bold'>Your color systems</h1>
          <p className='text-md font-medium'>
            A color system is the heart of your brand, with each color
            representing a world of possibilities for your idea.
          </p>
        </div>
      </section>

      <section className='flex flex-col m-2 px-6 py-12 space-y-6 rounded-xl bg-off text-center'>
        {systems.map((system) => (
          <ColorSystemCard key={system.id} colorSystem={system} />
        ))}
      </section>
    </main>
  );
}
