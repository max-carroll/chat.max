export const postMessage = (req: any, res: any) => {
    res.send(
      `I received your POST request. This is what you sent me: ${req.body.post}`
    );
  };