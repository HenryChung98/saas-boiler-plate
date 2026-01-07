import { Spinner } from "./ui/spinner";

export const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Spinner className="size-8 text-primary" />
    <span className="ml-2 text-gray-600">Loading...</span>
  </div>
);
