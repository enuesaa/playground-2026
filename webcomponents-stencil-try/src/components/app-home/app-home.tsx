import { Component, h } from '@stencil/core'
import { Router } from '../../'

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <p>
          Welcome to the Stencil App Starter
        </p>
        <button onClick={() => Router.push('/profile/stencil')}>
          Profile Page
        </button>
      </div>
    );
  }
}
