import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import HerokuLogo from 'app/components/HerokuLogo';
import DeploymentIntegration from 'app/components/DeploymentIntegration';

import { WorkspaceInputContainer } from '../../elements';

import { Wrapper } from './Elements';

class Heroku extends Component {
  state = { show: false };

  toggleHeroku = () =>
    this.setState(state => ({
      show: !state.show,
    }));
  deployHeroku = () => ({});

  render() {
    const {
      store: { deployment, editor },
      signals,
    } = this.props;
    const { show } = this.state;
    const originalGit = editor.currentSandbox.originalGit;

    return (
      <Wrapper loading={deployment.deploying}>
        <WorkspaceInputContainer style={{ marginTop: '1rem', marginBottom: 0 }}>
          <DeploymentIntegration
            loading={deployment.deploying || deployment.building}
            open={show}
            toggle={() => this.toggleHeroku()}
            color="#fff"
            light
            Icon={HerokuLogo}
            name="heroku"
            beta
            deploy={() => signals.deployment.deployWithHeroku()}
          >
            {originalGit ? (
              <>
                Deploy your sandbox app to{' '}
                <a
                  href="http://heroku.com"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Heroku
                </a>
              </>
            ) : (
              <>You need to push your sandbox to a github repo</>
            )}
          </DeploymentIntegration>
        </WorkspaceInputContainer>
      </Wrapper>
    );
  }
}

export default inject('signals', 'store')(observer(Heroku));
