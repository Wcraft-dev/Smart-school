import classModel from "../models/class.model";

export const addClas = async (req, res) => {
  const { author, text, start_date, end_date } = req.body;
  const clase = new classModel({
    author,
    text,
    start_date,
    end_date,
  });
  try {
    await clase.save();
    res.json({
      message: "Saved successfuly",
    });
  } catch (err) {
    let cx = err.message.split("Class_ validation failed:");
    let vc = cx.filter(Boolean);
    res
      .status(400)
      .json({ message: "couldn't save, please try again", error: vc });
  }
};
export const deleteClass = async (req, res) => {
  try {
    await classModel.findByIdAndDelete(req.params.id);

    res.json({ message: "deleted successfuly" });
  } catch (error) {
    res.status(400).json({ message: "couldn't deleted", error: error });
  }
};
function convert(arr) {
  let result = [];
  arr.forEach((sd) => {
    result.push({
      id: sd._id,
      text: sd.text,
      author: sd.author,
      start_date: sd.start_date,
      end_date: sd.end_date,
    });
  });
  return result;
}
export const getClases = async (req, res) => {
  try {
    const clases = await classModel.find();
    res.json(convert(clases));
  } catch (error) {
    res.status(400).json({ message: "couldn't get data", error: error });
  }
};

export const getClas = async (req, res) => {
  try {
    const clasx = await classModel.findById(req.params.id);
    res.json(clasx);
  } catch (error) {
    res.status(400).json({ message: "Couldn't get data" });
  }
};

export const updateClas = async (req, res) => {
  const { text, start_date, end_date } = req.body;
  if ((text, start_date, end_date) != null) {
    try {
      await classModel.updateOne(
        {
          _id: req.params.id,
        },
        {
          text,
          start_date,
          end_date,
        }
      );
      res.json({message:"Update successfully"});
    } catch (e) {
      res.status(400).json({message:"Couldn't updata", error:e});
    }

  } else {
    res.status(400).json({message:"Data was missing, try again"});
  }
};
