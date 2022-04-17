import type { LinksFunction, LoaderFunction } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import codeHighlightDarkCss from '~/styles/stackoverflow-dark.min.css'
import codeHighlightCss from '~/styles/stackoverflow-light.min.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: codeHighlightCss },
  {
    rel: 'stylesheet',
    href: codeHighlightDarkCss,
    media: '(prefers-color-scheme: dark)',
  },
]

interface LoaderData {
  title: string
  date: {
    raw: string
    formatted: string
  }
  content: string
}
export const loader: LoaderFunction = () => {
  return {
    title: 'Hello World',
    date: {
      raw: new Date().toISOString(),
      formatted: new Date().toLocaleString(),
    },
    content: `
    <h1>H1</h1>
    <a href="#a">test</a>
<h2>H2</h2>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, repellendus. Totam debitis atque repellendus nisi est magnam nostrum minima saepe accusantium delectus autem et consequuntur, voluptatum eius recusandae mollitia neque eveniet nemo explicabo unde! Animi deserunt exercitationem, doloremque suscipit reprehenderit odit sapiente assumenda! Natus similique, dolores vel sint porro obcaecati?</p>
<h3>H3</h3>
<h4>H4</h4>
<p><strong>bold text</strong></p>
<p><em>italicized text</em></p>
<blockquote>
<p>blockquote</p>
</blockquote>
<ol>
<li>First item</li>
<li>Second item</li>
<li>Third item</li>
</ol>
<ul>
<li>First item</li>
<li>Second item</li>
<li>Third item</li>
</ul>
<hr />
<p><code>code</code></p>
<pre><code class="hljs language-ts"><span class="hljs-keyword">const</span> <span class="hljs-attr">tesT</span>: <span class="hljs-built_in">string</span> = <span class="hljs-string">'test'</span>;

<span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) {
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"This is some javascript included in a markdown code block, and it will be converted to valid HTML with code syntax highlighting."</span>);
}
</code></pre>
<p>this is a keyboard input html element</p>
<pre><code class="hljs language-html"><span class="hljs-tag">&#x3C;<span class="hljs-name">span</span>></span>this will remain html even after the Markdown is converted to HTML<span class="hljs-tag">&#x3C;/<span class="hljs-name">span</span>></span>
</code></pre>`,
  }
}

export default function BlogArticlePage() {
  const { title, date, content } = useLoaderData<LoaderData>()

  return (
    <article className="mx-auto max-w-prose">
      <header>
        <h1 className="mt-2 block text-3xl font-extrabold leading-8 tracking-tight text-gray-12 sm:text-4xl">
          {title}
        </h1>
        <div className="mt-2 gap-2 text-gray-11 sm:inline-flex">
          <address>
            <Link rel="author" to="/author/john-doe">
              Jody Geraldo
            </Link>
          </address>
          <span className="hidden sm:inline" aria-hidden={true}>
            &mdash;
          </span>
          <time dateTime={date.raw} title={date.formatted}>
            {date.formatted}
          </time>
        </div>
      </header>

      <div
        className="prose prose-lg mx-auto mt-8"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}
