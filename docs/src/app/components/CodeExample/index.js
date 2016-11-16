import React, {Component, PropTypes} from 'react';
import {parse} from 'react-docgen';
import CodeBlock from './CodeBlock';
import Paper from 'new-ui/Paper';

class CodeExample extends Component {
  static propTypes = {
    children: PropTypes.node,
    code: PropTypes.string.isRequired,
    component: PropTypes.bool,
    description: PropTypes.string,
    exampleBlockStyle: React.PropTypes.object,
    layoutSideBySide: PropTypes.bool,
    title: PropTypes.string,
  };

  static defaultProps = {
    component: true,
  };

  render() {
    const {
      children,
      code,
      component,
      exampleBlockStyle,
      layoutSideBySide,
    } = this.props;

    const styles = {
      root: {
        backgroundColor: '#fff',
        marginBottom: 32,
      },
      exampleBlock: {
        borderRadius: '0 0 2px 0',
        padding: '14px 24px 24px',
        margin: 0,
        width: layoutSideBySide ? '45%' : null,
        float: layoutSideBySide ? 'right' : null,
      },
    };

    const docs = component ? parse(code) : {};

    return (
      <Paper style={styles.root}>
        <CodeBlock
          title={this.props.title}
          description={this.props.description || docs.description}
        >
          {code}
        </CodeBlock>
          {children}
      </Paper>
    );
  }
}

export default CodeExample;
