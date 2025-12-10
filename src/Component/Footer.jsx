

export default function Footer() {
  return (
    <footer className="bg-light text-center py-4 mt-5 border-top">
      <div className="container">
        <p className="mb-1">
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </p>
        <p className="small text-muted">
          Built with ❤️ using React & Firebase
        </p>
      </div>
    </footer>
  );
}
