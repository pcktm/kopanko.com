/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useState } from 'react';
import useSWR from 'swr'

export default function Footer() {
  const {data, error} = useSWR('/api/currently-playing', {refreshInterval: 30*1000});

  return (
      <footer className="footer">
      <div className="container">
        <div className="level">
          <div className="level-left">
            <div className="level-item copy">
              <p>&copy; 2022 Jakub Kopańko</p>
            </div>
          </div>
          <div className="level-right">
            <div className='level-item'>
              <span className="icon-text has-text-grey has-text-right">
              <span className="icon" css={css`color: #1DB954;`}>
                  <i className="ri-spotify-line"></i>
                </span>
                <span>
                  <span className="has-text-grey-dark">
                    {data?.title ? <a target="_blank" className="has-text-grey-dark" href={data?.url}>{data.title}</a> : "Not Playing"}
                  </span> – {data?.artist || "Spotify"}
                </span>
              </span>
            </div>
            {/* You are required to preserve this notice */}
            { !process.env.NEXT_PUBLIC_DISABLE_BRANDING &&
              <p className='has-text-right'>
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
