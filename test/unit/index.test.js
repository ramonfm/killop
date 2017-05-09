const expect = require('chai').expect;
const KillopStore = require('../../lib/stores');

describe('KillopStore', function() {
  beforeEach(function() {
    // reset the store to initial values
    KillopStore.setState(KillopStore.getInitialState());
  });

  it('should have an initial state of {status: \'enabled\'}', function() {
    expect(KillopStore.state.status).to.be.equal('enabled');
  });

  describe('toggleStatus()', function() {
    it('should switch the state to {status: \'disabled\'}', function() {
      KillopStore.toggleStatus();
      expect(KillopStore.state.status).to.be.equal('disabled');
    });

    it('should switch the state back to {status: \'enabled\'} when used a second time', function() {
      KillopStore.toggleStatus();
      KillopStore.toggleStatus();
      expect(KillopStore.state.status).to.be.equal('enabled');
    });
  });
});
