import { Button, Container, SectionHead } from '@/components/ui';

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ember-600">404</p>
        <SectionHead
          title="That page is not here"
          lede="The link is wrong, or the page moved while this preview was being built. Both are possible."
          center
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to the home page</Button>
          <Button href="/products/" variant="secondary">All products</Button>
        </div>
      </div>
    </Container>
  );
}
