export function HomePage() {
  return (
    <div className="space-y-8">
      <section className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Welcome to PPT-to-Video Converter
        </h2>
        <p className="text-gray-600">
          Transform your PowerPoint presentations into engaging video content with AI-powered
          narration.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Presentation</h3>
          <p className="text-gray-600">
            Coming soon: Upload your PowerPoint files and convert them into professional videos.
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Narration</h3>
          <p className="text-gray-600">
            Coming soon: Generate natural-sounding narration for your slides using advanced AI
            technology.
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Export</h3>
          <p className="text-gray-600">
            Coming soon: Export your presentation as a professional video with synchronized
            narration.
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Translation Support</h3>
          <p className="text-gray-600">
            Coming soon: Translate your presentations into multiple languages automatically.
          </p>
        </div>
      </section>
    </div>
  );
}
