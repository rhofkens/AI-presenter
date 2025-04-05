import { useState } from 'react';
import { BreadcrumbNav } from "../header/BreadcrumbNav";
import { MetadataForm } from "../forms/MetadataForm";
import { DropZone } from "../upload/DropZone";
import { SlidesList } from "../slides/SlidesList";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "../header/PageHeader";
import { WorkspaceSelector } from "../header/WorkspaceSelector";
import { SortDropdown } from "../header/SortDropdown";
import type { TemplateType } from "@/constants/templates";
import type { TagType } from "@/constants/tags";
import type { SlideItemProps } from "../slides/SlideItem";

interface CreateNewVideoProps {
  // Props will be added as needed in future tasks
}

interface MetadataFormData {
  title: string;
  description: string;
  template: TemplateType;
  tags: TagType[];
}

export const CreateNewVideo = ({}: CreateNewVideoProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [slides, setSlides] = useState<SlideItemProps[]>([]);
  const [formData, setFormData] = useState<MetadataFormData | null>(null);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Create New Video", href: "/create" },
  ];

  const handleFileAccepted = async (file: File) => {
    setIsUploading(true);
    setUploadedFile(file);

    try {
      // TODO: Replace with actual API call to process slides
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock slides data
      const mockSlides: SlideItemProps[] = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        title: `Slide ${i + 1}`,
        description: `Content from slide ${i + 1} of ${file.name}`,
        imageUrl: i === 0 ? 'https://picsum.photos/800/450' : undefined, // Example image for first slide
        narrative: `This slide covers the key points about ${['introduction', 'features', 'benefits', 'case studies', 'conclusion'][i]}. The content is designed to engage the audience and deliver the message effectively.`,
      }));
      
      setSlides(mockSlides);
      toast({
        title: "File uploaded successfully",
        description: `Processing ${file.name} for slides`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error uploading file",
        description: "There was a problem uploading your file. Please try again.",
      });
      setUploadedFile(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadError = (error: string) => {
    toast({
      variant: "destructive",
      title: "Upload Error",
      description: error,
    });
  };

  const handleMetadataSubmit = async (data: MetadataFormData) => {
    if (!uploadedFile) {
      toast({
        variant: "destructive",
        title: "Missing file",
        description: "Please upload a presentation file first",
      });
      return;
    }

    try {
      setFormData(data);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Project created successfully",
        description: "Your video project has been created and is being processed",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error creating project",
        description: "There was a problem creating your project. Please try again.",
      });
    }
  };

  return (
    <div>
      <PageHeader
        title="Create New Video"
        breadcrumbItems={breadcrumbItems}
      />

      {/* Main content with padding for header */}
      <div className="pt-16">
        <div className="px-8 pt-4 space-y-6">
          {/* Sub Header with Workspace and Actions */}
          <div className="flex items-center justify-between border-b border-gray-50 pb-4">
            <WorkspaceSelector />
            <div className="flex items-center gap-4">
              <SortDropdown />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* DropZone */}
          <div className="transition-all duration-300 ease-in-out">
            <DropZone
              onFileAccepted={handleFileAccepted}
              onError={handleUploadError}
              isLoading={isUploading}
              className="min-h-[200px]"
            />
          </div>

          {/* MetadataForm */}
          <div className="border rounded-lg p-6 bg-card transition-all duration-300 ease-in-out">
            <h2 className="text-lg font-semibold mb-4">Video Metadata</h2>
            <MetadataForm
              onSubmit={handleMetadataSubmit}
              disabled={!uploadedFile || isUploading}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="border rounded-lg p-6 bg-card transition-all duration-300 ease-in-out">
          <h2 className="text-lg font-semibold mb-4">Slides</h2>
          {isUploading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : slides.length > 0 ? (
           <SlidesList
             slides={slides}
             onEditSlide={(id) => {
               toast({
                 title: "Edit Slide",
                 description: `Editing slide ${id}`,
               });
               // TODO: Implement slide editing
             }}
             onDeleteSlide={(id) => {
               // Remove slide from state
               setSlides(slides.filter(slide => slide.id !== id));
               toast({
                 title: "Slide Deleted",
                 description: `Slide ${id} has been removed`,
               });
             }}
           />
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <p>Upload a presentation to see slides</p>
            </div>
          )}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};