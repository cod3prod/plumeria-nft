import SocialLink from "./social-link";
import Copyright from "./copyright";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <SocialLink />
          <Copyright />
        </div>
      </div>
    </footer>
  );
}
