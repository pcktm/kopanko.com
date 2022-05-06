/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import {useRouter} from 'next/router';
import profilePic from 'public/images/profile.jpg';

function NavbarItem({
  text, href, icon, isActive,
}: {text: string, href: string, icon: string | null, isActive: boolean}) {
  return (
    <Link href={href}>
      <a className={`navbar-item ${icon ? 'with-icon' : ''} ${isActive ? 'is-active' : ''}`}>
        <span className="navbar-item-name icon-text">
          { icon && <span className="icon"><i className={icon} /></span> }
          {text}
        </span>
      </a>
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {pathname} = useRouter();

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <header className="section main-navbar">
      <div className="container">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link href="/">
              <div className="navbar-item pr-5 is-clickable">
                <figure className="image is-64x64 is-square is-hidden-touch">
                  <Image
                    src={profilePic}
                    alt="profile pic"
                    layout="fill"
                    style={{borderRadius: '50%'}}
                    priority
                    quality={100}
                  />
                </figure>

                <div className="media is-hidden-desktop">
                  <div className="media-left">
                    <figure className="image is-48x48 is-square">
                      <Image
                        src={profilePic}
                        alt="profile pic"
                        layout="fill"
                        style={{borderRadius: '50%'}}
                        priority
                        quality={100}
                      />
                    </figure>
                  </div>
                </div>
                {/* <span className="title is-5 is-hidden-desktop">Jakub Kopańko</span> */}
              </div>
            </Link>
            { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */ }
            <a
              role="button"
              tabIndex={0}
              onClick={toggleMenu}
              className={`navbar-burger burger ${menuOpen ? 'is-active' : ''}`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navigation"
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>

          <div id="navigation" className={`navbar-menu ${menuOpen ? 'is-active' : ''}`}>
            <div className="navbar-start">

              {pathname !== 'nuttn' && (
              <>
                <NavbarItem text="Notes" href="/notes" icon="" isActive={pathname === '/notes'} />
                <NavbarItem text="Projects" href="/projects" icon="" isActive={pathname === '/projects'} />
                <NavbarItem text="Achievements" href="/achievements" icon="" isActive={pathname === '/achievements'} />
              </>
              )}
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <a href="https://github.com/pcktm" target="_blank" className="navbar-item is-size-5 " rel="noreferrer" aria-label="GitHub">
                  <span className="icon-text">
                    <span className="icon"><i className="ri-github-line" /></span>
                    <span className="is-hidden-desktop">&nbsp;GitHub</span>
                  </span>
                </a>
                <a href="https://www.linkedin.com/in/pcktm/" target="_blank" className="navbar-item is-size-5 " rel="noreferrer" aria-label="LinkedIn">
                  <span className="icon-text">
                    <span className="icon"><i className="ri-linkedin-line" /></span>
                    <span className="is-hidden-desktop">&nbsp;LinkedIn</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
