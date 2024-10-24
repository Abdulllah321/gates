export default function ErrorPage({ searchParams }) {
  const error = searchParams.error || "An unexpected error occurred.";

  return (
    <div>
      <h1>Error</h1>
      <p>{error}</p>
    </div>
  );
}
