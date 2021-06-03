import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import { ReactElement } from 'react';


export default function Card({title, subtitle, imageUrl, content}: {content?: string, title: string, subtitle: string, description?: string, imageUrl?: string}) {
    return (
      <div className="card" css={css`margin-bottom: 20px;`}>
        { imageUrl && 
          <div className="card-image" css={css`background-color: #878787;`}>
            <figure className="image is-5by3">
              <img css={css`object-fit: cover;`} src={imageUrl} />
            </figure>
          </div>
        }
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{title}</p>
              <p className="subtitle is-6">{subtitle}</p>
            </div>
          </div>
          <div className="content" dangerouslySetInnerHTML={{__html: content}}>
          </div>
        </div>
      </div>
    )
  }