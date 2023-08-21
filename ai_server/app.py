from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from flask_cors import CORS
from PIL import Image
from io import BytesIO
import ssl

# 플라스크 서버 실행
app = Flask(__name__)

# CORS 설정 해제 => 추후에 클라이언트 IP로만의 접근 허용으로 변경
CORS(app)

# 15labels라는 학습된 모델을 load
model = tf.keras.models.load_model('./15labels')  

# 15개의 출력층에 대한 인덱스값에 label을 지정 
labels = ['Angel Wing Begonia', 'Areca Palm', 'Broadleaf Lady Palm', 
          'Fiddle Leaf Fig', 'Gardenia Jasminoides', 'Geranium', 
          'Goldcrest Wilma', 'Golden Pothos', 'Heartleaf Philodendron', 
          'Lucky Bamboo', 'Money Tree', 'Monstera Deliciosa', 'Rubber Plant', 
          'Snake Plant', 'Cycad']

def name_possibility_three_potentials(preds):
    """ 15개의 결과 중 상위 3개의 결과를 리턴해주는 함수

    Args:
        preds (list): 15개의 인덱스를 갖는 예측 확률 list

    Returns:
        list: 15개의 결과 중에 확률이 높은 3가지를 순서대로 (식물 이름, 확률)로 정리하여 3개의 튜플을 갖는 리스트로 return
    """
    idx = preds.argsort()[0][-3:][::-1].tolist()
    return [(labels[idx[0]], preds[0][idx[0]]), (labels[idx[1]], preds[0][idx[1]]), (labels[idx[2]], preds[0][idx[2]])] 


def predict_image(img):
    """ 이미지를 변환 후 예측 모델에 이미지를 전달하여 preds 확률 리스트를 전달받고, 
      이를 상위 3개의 결과를 얻는 함수에 전달하여 그에 따른 결과값을 return

    Args:
        img (image): 클라이언트로부터 받아온 이미지 파일

    Returns:
        list: 이미지 파일을 예측하여 확률이 높은 상위 3가지의 (식물 이름, 확률)을 리스트로 return
    """
    img = img.convert("RGB")  # RGB로 채널 변환
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = x / 255.0  # 예측 모델에 맞게 이미지 변환

    preds = model.predict(x)
    res = name_possibility_three_potentials(preds)
    return res


@app.route('/predict', methods=['POST'])
def predict():
    try:
        file = request.files['plantImage']  # 클라이언트로부터 image 파일 수신
        img_data = file.read()
        img = Image.open(BytesIO(img_data))
        img = img.resize((224, 224))  # 이미지파일을 예측 모델에 맞게 수정

        name_possibility_lst = predict_image(img)  # 상위 3가지의 정보가 담긴 리스트를 저장
        return_dict = dict()

        # json객체로 전달하기 위해 dict형태로 리스트를 변환함
        for i in range(3):
            return_dict[i+1] = {'plantName':name_possibility_lst[i][0], 'possibility': float(name_possibility_lst[i][1])}

        return jsonify(return_dict)  # 결과를 클라이언트에 다시 전송
    
    except Exception as e:
        print(e)  # 로그를 출력하거나 로그 파일에 기록
        return jsonify({'error': 'There was an error processing the request'}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)  # 포트번호 5000으로 실행
