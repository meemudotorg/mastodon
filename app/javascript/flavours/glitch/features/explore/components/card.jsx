import PropTypes from 'prop-types';
import { useCallback } from 'react';

import { FormattedMessage, useIntl, defineMessages } from 'react-intl';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from '@/material-icons/400-24px/close.svg?react';
import { dismissSuggestion } from 'flavours/glitch/actions/suggestions';
import { Avatar } from 'flavours/glitch/components/avatar';
import { DisplayName } from 'flavours/glitch/components/display_name';
import { FollowButton } from 'flavours/glitch/components/follow_button';
import { IconButton } from 'flavours/glitch/components/icon_button';
import { domain } from 'flavours/glitch/initial_state';

const messages = defineMessages({
  dismiss: { id: 'follow_suggestions.dismiss', defaultMessage: "Don't show again" },
});

export const Card = ({ id, source }) => {
  const intl = useIntl();
  const account = useSelector(state => state.getIn(['accounts', id]));
  const dispatch = useDispatch();

  const handleDismiss = useCallback(() => {
    dispatch(dismissSuggestion({ accountId: id }));
  }, [id, dispatch]);

  let label;

  switch (source) {
  case 'friends_of_friends':
    label = <FormattedMessage id='follow_suggestions.friends_of_friends_longer' defaultMessage='Popular among people you follow' />;
    break;
  case 'similar_to_recently_followed':
    label = <FormattedMessage id='follow_suggestions.similar_to_recently_followed_longer' defaultMessage='Similar to profiles you recently followed' />;
    break;
  case 'featured':
    label = <FormattedMessage id='follow_suggestions.featured_longer' defaultMessage='Hand-picked by the {domain} team' values={{ domain }} />;
    break;
  case 'most_followed':
    label = <FormattedMessage id='follow_suggestions.popular_suggestion_longer' defaultMessage='Popular on {domain}' values={{ domain }} />;
    break;
  case 'most_interactions':
    label = <FormattedMessage id='follow_suggestions.popular_suggestion_longer' defaultMessage='Popular on {domain}' values={{ domain }} />;
    break;
  }

  return (
    <div className='explore__suggestions__card'>
      <div className='explore__suggestions__card__source'>
        {label}
      </div>

      <div className='explore__suggestions__card__body'>
        <Link to={`/@${account.get('acct')}`} data-hover-card-account={account.id}><Avatar account={account} size={48} /></Link>

        <div className='explore__suggestions__card__body__main'>
          <div className='explore__suggestions__card__body__main__name-button'>
            <Link className='explore__suggestions__card__body__main__name-button__name' to={`/@${account.get('acct')}`} data-hover-card-account={account.id}><DisplayName account={account} /></Link>
            <IconButton iconComponent={CloseIcon} onClick={handleDismiss} title={intl.formatMessage(messages.dismiss)} />
            <FollowButton accountId={account.get('id')} />
          </div>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  source: PropTypes.oneOf(['friends_of_friends', 'similar_to_recently_followed', 'featured', 'most_followed', 'most_interactions']),
};
