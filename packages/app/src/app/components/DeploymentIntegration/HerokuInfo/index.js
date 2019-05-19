import React from 'react';
import Margin from '@codesandbox/common/lib/components/spacing/Margin';
import Modal from 'app/components/Modal';

import { Button } from '@codesandbox/common/lib/components/Button';
import { githubRepoUrl } from '@codesandbox/common/lib/utils/url-generator';

import { inject, observer } from 'mobx-react';

import { Details, Info } from './elements';

const qs = require('qs');

class HerokuInfo extends React.Component {
  state = {
    isOpen: false,
  };
  render() {
    const {
      store: { editor },
      info,
      deploy,
      bgColor,
      light,
      loading,
    } = this.props;

    const originalGit = editor.currentSandbox.originalGit;
    let app = {
      name: editor.currentSandbox.alias,
      template: '',
    };
    if (originalGit) {
      app.template = githubRepoUrl(originalGit);
    }
    const HerokuDeployUrl = 'https://heroku.com/deploy';

    const appParams = qs.stringify(app, { encode: false });
    const HerokuFullDeployUrl = `${HerokuDeployUrl}?${appParams}`;
    return (
      <Details bgColor={bgColor}>
        <Margin right={2}>
          <Info light={light}>{info}</Info>
        </Margin>
        <Button
          small
          disabled={loading}
          onClick={() => {
            this.setState({ isOpen: true });
          }}
        >
          Deploy
        </Button>
        <Modal isOpen={this.state.isOpen} width={500} title="Deploy Heroku">
          <div style={{ padding: '20px' }}>
            {originalGit ? (
              <>
                <p>
                  By clicking on deploy, you will be taken to heroku to complete
                  deployment
                </p>
                <a
                  href={HerokuFullDeployUrl}
                  target="_blank"
                  style={{ marginRight: '20px' }}
                >
                  <Button small>Deploy</Button>
                </a>
                <Button
                  small
                  onClick={() => {
                    this.setState({ isOpen: false });
                  }}
                >
                  Close
                </Button>
              </>
            ) : (
              <>
                <p>
                  You need to push to github before you can deploy to heroku
                </p>
                <Button
                  small
                  onClick={() => {
                    this.setState({ isOpen: false });
                  }}
                >
                  Close
                </Button>
              </>
            )}
          </div>
        </Modal>
      </Details>
    );
  }
}

export default inject('signals', 'store')(observer(HerokuInfo));
