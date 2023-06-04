const pagination = async(pageNumber,modelName,limit_display)=>{
    try {
        let pageNumber = request.query.page;
        //? if user send string in url
        pageNumber = pageNumber * 1 || 1;
        if (pageNumber <= 0 || !pageNumber) pageNumber = 1;
        let LIMIT = 5;
        let skip = (pageNumber - 1) * LIMIT;
        //! catch id from token
        const receivedId = request.userId;
        let data = await messageModel
          .find({ receivedId })
          .skip(skip)
          .limit(LIMIT)
          .sort("-createdAt");
        response.status(200).json({
          data,
          pageNumber,
        });
      } catch (error) {
        next(error);
      }
}