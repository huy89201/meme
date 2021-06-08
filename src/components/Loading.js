import React from "react";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  node: {
    display: "inline-block",
    width: "0.5rem",
    height: "0.5rem",
    backgroundColor: "#ec5990",
    borderRadius: "50%",
    marginLeft: "1rem",
  },
  container: {
    margin: "0.5rem 0"
  }
}));

function Loading() {
  const classes = useStyles();

  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const nodeVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const nodeTransitions = {
    duration: 0.3,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  return (
    <motion.div variants={containerVariants} initial="start" animate="end" className={classes.container}>
      <motion.span
        className={classes.node}
        variants={nodeVariants}
        transition={nodeTransitions}
      />
      <motion.span
        className={classes.node}
        variants={nodeVariants}
        transition={nodeTransitions}
      />
      <motion.span
        className={classes.node}
        variants={nodeVariants}
        transition={nodeTransitions}
      />
    </motion.div>
  );
}

export default Loading;
