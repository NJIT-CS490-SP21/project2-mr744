import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../../'))
from app import add_player, models
import models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"
KEY_SCORE = 100

INITIAL_USERNAME = 'user1'

class AddUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: 'naman',
                KEY_SCORE: 100,
                # KEY_EXPECTED: [INITIAL_USERNAME, 'naman'],
                KEY_EXPECTED: {INITIAL_USERNAME: 100, 'naman':100 },
            },
        ]
        
        # initial_person = models.Person(username=INITIAL_USERNAME, email='{0}@stuff.com'.format(INITIAL_USERNAME))
        initial_person = models.Players(username=INITIAL_USERNAME, score=100)
        print(initial_person)
        self.initial_db_mock = {initial_person.username:initial_person.score}
    
    def mocked_db_session_add(self,player):
        print("1: ")
        print(self.initial_db_mock)
        self.initial_db_mock.update(player)
    
    def mocked_db_session_commit(self):
        print("2: ")
        print(self.initial_db_mock)
        pass
    
    def mocked_person_query_all(self):
        # print("3: ")
        # print(self.initial_db_mock)
        # return self.initial_db_mock
        pass
    def mocked_get_leader(self, userList):
        return self.initial_db_mock
        
    # def mocked_player_order_by(self, the_list=models.Players.score):
    #     return the_list
        
    # def mocked_player_score_desc(self,the_list=models.Players.score ):
    #     return the_list
    
    
    def test_success(self):
        for test in self.success_test_params:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit', self.mocked_db_session_commit):
                    with patch('app.my_order_by', self.mocked_person_query_all):
                        with patch('app.get_leader', self.mocked_get_leader):
                    
                        
                            # mocked_query.all = self.mocked_person_query_all()
                            # print(f"The mocked one: {mocked_query.all}")
                            
                            print(self.initial_db_mock)
                            player={ test[KEY_INPUT]: test[KEY_SCORE]}
                            actual_result = add_player(player)
                            
                            # print(mocked_query.all)
                            
                            # actual_result = mocked_query.order_by.all
                            print(actual_result)
                            expected_result = test[KEY_EXPECTED]
                            print(expected_result)
                            self.assertEqual(len(actual_result), len(expected_result))
                            self.assertEqual(actual_result, expected_result)
                    
            



if __name__ == '__main__':
    unittest.main()
    
    
    
    
    
    
    
    
    
    
    
    
            # with patch('app.db.session.add', self.mocked_db_session_add):
            #     with patch('app.db.session.commit', self.mocked_db_session_commit):
            #         with patch('models.Person.query') as mocked_query:
            #             mocked_query.all = self.mocked_person_query_all
    
            #             print(self.initial_db_mock)
            #             actual_result = add_user(test[KEY_INPUT], 100)
            #             print(actual_result)
            #             expected_result = test[KEY_EXPECTED]
            #             print(self.initial_db_mock)
            #             print(expected_result)
                        
            #             self.assertEqual(len(actual_result), len(expected_result))
            #             self.assertEqual(actual_result[1], expected_result[1])