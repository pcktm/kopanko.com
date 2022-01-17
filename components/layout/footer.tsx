/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useState } from 'react';
import useSWR from 'swr'

export default function Footer() {
  const { data, error } = useSWR('/api/currently-playing', { refreshInterval: 30 * 1000 });

  return (
    <footer className="footer">
      <div className="container">
        <div className="level">
          
          <div className="level-left">
            <div className='level-item'>
              <div className="level is-mobile">
                <div className="level-left has-text-center">
                  <div className="level-item">
                    <i className="ri-spotify-line " css={css`color: #1DB954`}></i>
                    <span className="mr-4"></span>
                  </div>
                </div>
                <div className="level-right mt-0">
                  <div className="level-item">
                    <span className="has-text-grey has-text-left">
                      <span>
                        <span className="has-text-grey-dark">
                          {data?.title ? <a target="_blank" className="has-text-grey-dark" href={data?.url}>{data.title}</a> : "Not Playing"}
                        </span>
                        <span className="is-hidden-mobile"> – </span>
                        <br className="is-hidden-tablet" />
                        {data?.artist || "Spotify"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* You are required to preserve this notice */}
            {!process.env.NEXT_PUBLIC_DISABLE_BRANDING &&
              <p className='has-text-left ml-6'>
                By <a href="https://kopanko.com">Jakub Kopańko</a> under AGPL-3.0.<br />
                Source code available on <a href="https://github.com/pcktm/kopanko.com">GitHub</a>.
              </p>
            }
          </div>
          <div className="level-right">
            <div className="level-item copy">
              <p>&copy; 2022 Jakub Kopańko</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
