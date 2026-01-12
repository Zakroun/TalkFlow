import { Download } from "lucide-react";

export default function DownloadSection() {
  return (
    <section id="download" className="py-20 bg-green-600 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">
        Download Pulse Now
      </h2>
      <p className="mb-8">
        Available on Web, Android, and iOS platforms.
      </p>
      <button className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold">
        <Download size={18} />
        Download App
      </button>
    </section>
  );
}
