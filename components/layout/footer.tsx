export default function Footer() {
    return (
        <footer className="footer">
        <div className="container">
          <div className="level">
            <div className="level-left">
              <div className="level-item copy">
                &copy; 2021 Jakub Kopańko
              </div>
            </div>
            <div className="level-right has-text-right">
              { !process.env.NEXT_PUBLIC_DISABLE_BRANDING &&
                <p>
                  By <a href="https://kopanko.com">Jakub Kopańko</a> under AGPL-3.0.<br />
                  Source code available on <a href="https://github.com/pcktm/kopanko.com">GitHub</a>.
                </p>
              }
            </div>
          </div>
        </div>
      </footer>
    )
}