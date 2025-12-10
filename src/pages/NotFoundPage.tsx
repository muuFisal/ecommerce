import React from 'react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <section className="py-16">
      <Container className="flex flex-col items-center text-center space-y-5">
        <p className="text-xs uppercase tracking-[0.3em] text-text-muted">404</p>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-text-main">
          This page drifted off the grid.
        </h1>
        <p className="max-w-md text-sm text-text-muted">
          Maybe the drop moved, maybe the link is old. No problem — head back home and we&apos;ll help you find a
          fresh fit.
        </p>
        <Link to="/">
          <Button className="px-5 py-2.5 text-xs">Back to home</Button>
        </Link>
      </Container>
    </section>
  );
};

export default NotFoundPage;