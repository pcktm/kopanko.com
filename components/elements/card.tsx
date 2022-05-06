import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {ReactElement} from 'react';
import {Action, Image as DImage} from 'lib/DTOs';

type Props = {
  content?: string,
  title: string,
  subtitle: string,
  image?: DImage,
  action?: Action
};

export default function Card({
  title, subtitle, image, content, action,
}: Props) {
  return (
    <div className="card" style={{marginBottom: '20px'}}>
      { image
          && (
          <div className="card-image">
            <Image
              src={image.url}
              alt="Card cover"
              width={image.width}
              height={image.height}
              layout="responsive"
              placeholder={image.placeholder ? 'blur' : 'empty'}
              blurDataURL={image.placeholder}
            />
            { action
            && (
            <a href={action.url} target="_blank" rel="noreferrer">
              <button className="button is-light is-rounded call-to-action" type="button">
                <span className="icon">
                  <i className={action.icon} />
                </span>
                <span>{action.text}</span>
              </button>
            </a>
            )}
          </div>
          )}
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{title}</p>
            <p className="subtitle is-6">{subtitle}</p>
          </div>
        </div>
        <div>
          { /* eslint-disable-next-line react/no-danger */ }
          <div className="content" dangerouslySetInnerHTML={{__html: content ?? ''}} />
        </div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  content: '',
  image: null,
  action: null,
};
