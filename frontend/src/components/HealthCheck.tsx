import { useEffect, useState } from 'react';

interface HealthStatus {
  status: string;
}

export function HealthCheck() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('/api/health');
        if (!response.ok) {
          throw new Error('Health check failed');
        }
        const data = await response.json();
        setHealth(data);
        setError(null);
      } catch (err) {
        setError('Backend connection failed');
        setHealth(null);
      }
    };

    checkHealth();
  }, []);

  if (error) {
    return <div className="text-red-500">❌ {error}</div>;
  }

  if (!health) {
    return <div className="text-gray-500">⏳ Checking backend connection...</div>;
  }

  return (
    <div className="text-green-500">
      ✅ Backend Status: {health.status}
    </div>
  );
}