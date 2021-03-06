import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  card: {
    maxWidth: 700,
    margin: 4
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              К
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="KEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAM"
          subheader="Февраль 17, 2018"
        />
        <CardMedia
          className={classes.media}
          image="http://risovach.ru/thumb/upload/240c240/2017/02/generator/oo_136389863_orig_.jpg?ejv9p"
          title="KEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAM"
        />
        <CardContent>
          <Typography component="p">
            KEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAM
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Лолям:</Typography>
            <Typography paragraph>
            KEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAMKEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAM.
            </Typography>
            <Typography paragraph>
            KEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAMKEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAMKEKEKEKEKEKEKEKEK 
            LOLOL TATATAMAMTAMKEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAMKEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAMKEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAM
            </Typography>
            <Typography paragraph>
            KEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAMKEKEKEKEKEKEKEKEK LOLOL 
            KEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAMKEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAMKEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAM
            KEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAMKEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAM
            TATATAMAMTAMKEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAMKEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAM
            </Typography>
            <Typography>
            KEKEKEKEKEKEKEKEK LOLOL TATATAMAMTAM.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);