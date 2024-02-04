import Author from '../models/authorModel.js';

//Add new author POST

export const addAuthor = async (req, res) => {
  const { name, age } = req.body;
  try {
    if (!name) {
      res.status(400).json({ message: 'Add a name' });
    }

    const author = await Author.create({
      name,
      age,
    });

    if (author) {
      res.status(201).json({
        name: author.name,
        age: author.age,
      });
    } else {
      res.status(500).json({ error: 'Failed to create Author' });
    }
  } catch (error) {
    console.error('Error adding author:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all authors GET

export const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();

    res.status(200).json(authors);
  } catch (error) {
    console.error('Error getting authors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get one Author GET

export const getAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      res.status(404).json({ message: 'Found no Author!' });
    }
    res.status(200).json(author);
  } catch (error) {
    console.error('Error getting authors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Update an Author PUT

export const updateAuthor = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: 'add your changes' });
    }
    const author = await Author.findById(req.params.id);
    if (!author) {
      res.status(404).json({ message: 'Author not found' });
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(201).json(updatedAuthor);
  } catch (error) {
    console.error('Error getting authors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// delete author DELETE
export const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    await Author.deleteOne({ _id: req.params.id });
    return res.status(200).json({ message: 'Deleted', id: req.params.id });
  } catch (error) {
    console.error('Error deleting author:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
