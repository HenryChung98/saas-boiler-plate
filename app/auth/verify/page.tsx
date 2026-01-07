export default function VerifyPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-6 rounded-lg bg-[var(--card)] border border-[var(--border)] shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Check Your Email</h2>
        <div className="space-y-4 text-center">
          <div className="flex justify-center mb-4">
            <svg
              className="w-16 h-16 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-[var(--muted-foreground)]">
            We've sent a verification link to your email address.
          </p>
          <p className="text-sm text-[var(--muted-foreground)]">
            Please check your inbox and click the link to verify your account.
          </p>
        </div>
      </div>
    </div>
  );
}
