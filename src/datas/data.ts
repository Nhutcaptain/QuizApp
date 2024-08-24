import { ImageSourcePropType } from "react-native";

interface Option {
    id: number;
    text: string;
    isCorrect: boolean;
  }
  
  interface Question {
    question: string;
    id: number;
    type: string;
    options?: Option[];
    answer?: string;
    expand?: string;
    rightEssayAnswer?: string;
  }
  
  interface Level {
    level: number;
    name: string;
    title: string;
    description: string;
    backgroundImage: ImageSourcePropType;
    difficulty: number;
    subLevel: SubLevel[]
  }
  
  interface SubLevel {
    subname: string;
    subtitle: string;
    subdescription: string;
    season: number;
    subbackgroundImage: ImageSourcePropType;
    questions: Question[];
  }

  const levels: Level[] = [
    {
      level: 1,
      name: "Level 1",
      title: "TUỔI NHỎ LÀM VIỆC NHỎ",
      description: "Mô tả cho Level 1",
      backgroundImage: require("../../assets/images/level_background/Level1.jpg"),
      difficulty: 1,
      subLevel: [
        {
        subname: "subname1",
        season: 1,
        subtitle: 'Khu vườn "Danh từ" ',
        subdescription: "Description for SubLevel 1",
        subbackgroundImage: require("../../assets/images/level_background/subquest_Backgrounds/jungle.jpg"),
        questions: [
          {
            question: "Ai là người đẹp trai nhất Việt Nam",
            id: 1,
            type: 'multichoice',
            options: [
              { id: 1, text: "Ai sợ thì đi xăm chân mày", isCorrect: false },
              { id: 2, text: "Sơn Tùng MTP, mầy không biết là mầy ngu", isCorrect: true },
              { id: 3, text: "Jack bỏ con", isCorrect: false },
              { id: 4, text: "Không biết nữa", isCorrect: false },
            ],
            expand: 'Sơn Tùng là người đẹp trai nhất Việt Nam'
          },
          {
            question: "Hoàng Sa, Trường Sa là của: ",
            id: 2,
            type: 'multichoice',
            options: [
              { id: 1, text: "Việt Nam (Mầy không biết là mầy ngu)", isCorrect: true },
              { id: 2, text: "Một nước khác", isCorrect: false },
              { id: 3, text: "Hỏi dậy cũng hỏi", isCorrect: false },
              { id: 4, text: "Quá ngu", isCorrect: false },
            ],
            expand: 'Cái này thì không cần phải giải thích'
          },
          {
            question: 'Hãy điền vào chỗ trống câu: \"Cần cù thì bù......\"',
            id: 3,
            type: 'essay',
            rightEssayAnswer: 'thông minh',
            expand: 'Thằng nào nghe thầy Huấn mà bù siêng năng xứng đáng 0 điểm'
          }
          // Thêm 4 câu hỏi nữa cho Level 1...
        ],
        },
        {
          subname: "subname2",
          season: 2,
          subtitle: "Khu vườn \"Động từ\"",
          subdescription: "Description for SubLevel 1",
          subbackgroundImage: require("../../assets/images/level_background/subquest_Backgrounds/garden.png"),
          questions: [
            {
              question: "Câu hỏi 1 cho Level 1",
              type: 'multichoice',
              id: 1,
              options: [
                { id: 1, text: "Lựa chọn A cho câu hỏi 1", isCorrect: true },
                { id: 2, text: "Lựa chọn B cho câu hỏi 1", isCorrect: false },
                { id: 3, text: "Lựa chọn C cho câu hỏi 1", isCorrect: false },
                { id: 4, text: "Lựa chọn D cho câu hỏi 1", isCorrect: false },
              ],
            },
            // Thêm 4 câu hỏi nữa cho Level 1...
          ],
          },
          {
            subname: "subname3",
            season: 3,
            subtitle: "Cánh đồng \"Vốn từ: Đoàn kết\"",
            subdescription: "Description for SubLevel 1",
            subbackgroundImage: require("../../assets/images/level_background/subquest_Backgrounds/island.png"),
            questions: [
              {
                question: "Câu hỏi 1 cho Level 1",
                type: 'multicoice',
                id: 2,
                options: [
                  { id: 1, text: "Lựa chọn A cho câu hỏi 1", isCorrect: true },
                  { id: 2, text: "Lựa chọn B cho câu hỏi 1", isCorrect: false },
                  { id: 3, text: "Lựa chọn C cho câu hỏi 1", isCorrect: false },
                  { id: 4, text: "Lựa chọn D cho câu hỏi 1", isCorrect: false },
                ],
              },
              // Thêm 4 câu hỏi nữa cho Level 1...
            ],
            },
      ]
    },
    {
      level: 2,
      name: "Tên Level 2",
      title: "MẢNH GHÉP YÊU THƯƠNG",
      description: "Mô tả cho Level 2",
      backgroundImage: require("../../assets/images/level_background/Level2.jpg"),
      difficulty: 2,
      subLevel: [
        {
          subname: "Tên subname 2",
          subtitle: "Subtitle for SubLevel 2",
          subdescription: "Description for SubLevel 2",
          season: 1,
          subbackgroundImage: "subbackground2.jpg",
          questions: [
            {
              question: "Câu hỏi 1 cho Level 2",
              options: [
                { id: 1, text: "Lựa chọn A cho câu hỏi 1", isCorrect: true },
                { id: 2, text: "Lựa chọn B cho câu hỏi 1", isCorrect: false },
                { id: 3, text: "Lựa chọn C cho câu hỏi 1", isCorrect: false },
                { id: 4, text: "Lựa chọn D cho câu hỏi 1", isCorrect: false },
              ],
            },
            // Thêm 4 câu hỏi nữa cho Level 2...
          ],
        },
      ],
    },
    {
      level: 3,
      name: "Tên Level 3",
      title: "NHỮNG ƯỚC MƠ XANH",
      description: "Mô tả cho Level 2",
      backgroundImage: require("../../assets/images/level_background/Level3.jpg"),
      difficulty: 2,
      subLevel: [
        {
          subname: "Tên subname 2",
          subtitle: "Subtitle for SubLevel 2",
          subdescription: "Description for SubLevel 2",
          subbackgroundImage: "subbackground2.jpg",
          questions: [
            {
              question: "Câu hỏi 1 cho Level 2",
              options: [
                { id: 1, text: "Lựa chọn A cho câu hỏi 1", isCorrect: true },
                { id: 2, text: "Lựa chọn B cho câu hỏi 1", isCorrect: false },
                { id: 3, text: "Lựa chọn C cho câu hỏi 1", isCorrect: false },
                { id: 4, text: "Lựa chọn D cho câu hỏi 1", isCorrect: false },
              ],
            },
            // Thêm 4 câu hỏi nữa cho Level 2...
          ],
        },
      ],
    },
    {
      level: 4,
      name: "Tên Level 4",
      title: "NHỮNG NGƯỜI TÀI TRÍ",
      description: "Mô tả cho Level 2",
      backgroundImage: require("../../assets/images/level_background/Level4.png"),
      difficulty: 2,
      subLevel: [
        {
          subname: "Tên subname 2",
          subtitle: "Subtitle for SubLevel 2",
          subdescription: "Description for SubLevel 2",
          subbackgroundImage: "subbackground2.jpg",
          questions: [
            {
              question: "Câu hỏi 1 cho Level 2",
              options: [
                { id: 1, text: "Lựa chọn A cho câu hỏi 1", isCorrect: true },
                { id: 2, text: "Lựa chọn B cho câu hỏi 1", isCorrect: false },
                { id: 3, text: "Lựa chọn C cho câu hỏi 1", isCorrect: false },
                { id: 4, text: "Lựa chọn D cho câu hỏi 1", isCorrect: false },
              ],
            },
            // Thêm 4 câu hỏi nữa cho Level 2...
          ],
        },
      ],
    },
    // Tạo thêm các level từ 3 đến 10...
    
  ];
  
  export { Level, levels, SubLevel, Question, Option };