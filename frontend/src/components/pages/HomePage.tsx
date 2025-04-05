import { useState } from 'react';
import { ProjectList } from '../projects/ProjectList';
import { MOCK_PROJECTS } from '../../mock/projects';
import { WorkspaceSelector } from '../header/WorkspaceSelector';
import { CreateButton } from '../header/CreateButton';
import { SortDropdown } from '../header/SortDropdown';
import { UserMenu } from '../header/UserMenu';

export function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleAction = async (
    action: () => Promise<void>,
    loadingMessage: string
  ) => {
    try {
      setIsLoading(true);
      setError(undefined);
      await action();
    } catch (err) {
      setError(`Failed to ${loadingMessage}. Please try again.`);
      console.error(`Error during ${loadingMessage}:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    await handleAction(
      async () => {
        console.log('Edit clicked');
        await new Promise(resolve => setTimeout(resolve, 1000));
      },
      'edit project'
    );
  };

  const handleDelete = async () => {
    await handleAction(
      async () => {
        console.log('Delete clicked');
        await new Promise(resolve => setTimeout(resolve, 1000));
      },
      'delete project'
    );
  };

  const handleDownload = async () => {
    await handleAction(
      async () => {
        console.log('Download clicked');
        await new Promise(resolve => setTimeout(resolve, 1000));
      },
      'download project'
    );
  };

  const handleTranslate = async () => {
    await handleAction(
      async () => {
        console.log('Translate clicked');
        await new Promise(resolve => setTimeout(resolve, 1000));
      },
      'translate project'
    );
  };

  const handlePlay = async () => {
    await handleAction(
      async () => {
        console.log('Play clicked');
        await new Promise(resolve => setTimeout(resolve, 1000));
      },
      'play project'
    );
  };

  return (
    <div>
      {/* Fixed header */}
      <header className="fixed top-0 right-0 left-64 bg-white h-16 z-10">
        <div className="h-full border-b border-gray-200 px-8 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">Home</h1>
          <UserMenu />
        </div>
      </header>

      {/* Main content with padding for header */}
      <div className="pt-16">
        <div className="px-8 pt-4 space-y-6">
          {/* Sub Header with Workspace and Actions */}
          <div className="flex items-center justify-between border-b border-gray-50 pb-4">
            <WorkspaceSelector />
            <div className="flex items-center gap-4">
              <SortDropdown />
              <div className="h-4 w-px bg-gray-200" />
              <CreateButton />
            </div>
          </div>

          {/* Project List */}
          <ProjectList
            projects={MOCK_PROJECTS}
            isLoading={isLoading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownload={handleDownload}
            onTranslate={handleTranslate}
            onPlay={handlePlay}
          />
        </div>
      </div>
    </div>
  );
}
