const LoadingState = () => (
  <div className="container mx-auto max-w-7xl px-4 py-6 pt-24">
    <div className="flex h-64 items-center justify-center">
      <div className="text-center">
        <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-2 border-b-transparent" />
        <p className="text-muted-foreground mt-4">Loading saved jobs...</p>
      </div>
    </div>
  </div>
);

export default LoadingState;
