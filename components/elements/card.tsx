import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import { ReactElement } from 'react';


export default function Card({title, subtitle, description, imageUrl, children}: {children?: ReactElement | string, title: string, subtitle: string, description?: string, imageUrl: string}) {
    return (
      <div className="card" css={css`margin-bottom: 20px;`}>
        <div className="card-image" css={css`background-color: #878787;`}>
          <Image
            src={imageUrl}
            alt="A screenshot of our creation"
            width={600}
            height={300}
            layout="responsive"
            css={css`object-fit:cover;`}
          />
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{title}</p>
              <p className="subtitle is-6">{subtitle}</p>
            </div>
          </div>
          <div className="content">
            {children}
            {description}
          </div>
        </div>
      </div>
    )
  }