import ContactForm from '@/components/forms/ContactForm';

const ContactPage = () => {
  return (
    <main className='flex flex-col min-h-screen'>
      <section className='flex flex-col m-2 px-6 pt-40 pb-12 space-y-24 rounded-xl bg-sky-blue-to-soft-peach text-center'>
        <div className='flex flex-col space-y-6'>
          <h1 className='text-4xl font-bold'>Send us a message</h1>
          <p className='font-medium'>
            Get in touch with us and we&apos;ll reply as soon as we can.
          </p>
        </div>
      </section>
      <section className='flex flex-col m-2 px-6 py-12 space-y-10 rounded-xl bg-off'>
        <ContactForm />
      </section>
    </main>
  );
};

export default ContactPage;
