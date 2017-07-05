import htmlparser2 from 'htmlparser2';
import ProcessNodes from './utils/ProcessNodes';

/**
 * Parses a HTML string and returns a list of React components generated from it
 *
 * @param {String} html The HTML to convert into React components
 * @returns {Array} List of top level React elements
 */
export default function HtmlParser(html) {

  if(typeof html === 'string'){
		html = html.replace(/data-reactid\=\"[0-9a-zA-Z-.$]*\s*\"/gi,'');
	}
  const nodes = htmlparser2.parseDOM(html);
  return ProcessNodes(nodes);
}
