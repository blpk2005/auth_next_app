export default async function UserProfile(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ unwrap the Promise

  return (
    <div className="profile-page flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold">Profile</h1>
      <hr />
      <p className="text-4xl">
        User ID:
        <span className="p-2 rounded bg-red-500">{id}</span>
      </p>
    </div>
  );
}
