import Link from 'next/link';
import { Bot, ArrowLeft } from 'lucide-react'; // Or your respective icon library

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <div className="flex flex-col items-center text-center">
        <div className="bg-blue-100 text-blue-600 p-4 rounded-full shadow-md mb-6">
          <Bot className="w-16 h-16" />
        </div>
        <h1 className="text-4xl font-bold mb-4">صفحه مورد نظر پیدا نشد!</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          به نظر می‌رسد که در مسیر اشتباهی هستید. شاید بخواهید به خانه بازگردید یا با چت‌بات ما صحبت کنید.
        </p>
        <div className="flex space-x-4">
          <Link
            href="/"
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            بازگشت به خانه
          </Link>
          <Link
            href="/chat"
            className="flex items-center px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition-all"
          >
            شروع گفتگو با چت‌بات
          </Link>
        </div>
      </div>
    </div>
  );
}