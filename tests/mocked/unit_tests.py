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
                KEY_EXPECTED: {INITIAL_USERNAME: 100, 'naman':100 },
            },
            {
                KEY_INPUT: 'joe',
                KEY_SCORE: 100,
                KEY_EXPECTED: {INITIAL_USERNAME: 100, 'naman':100, 'joe':100 },
            },
            {
                KEY_INPUT: 'biden',
                KEY_SCORE: 100,
                KEY_EXPECTED: {INITIAL_USERNAME: 100, 'naman':100, 'joe':100, 'biden':100 },
            },
        ]
        
        # initial_person = models.Person(username=INITIAL_USERNAME, email='{0}@stuff.com'.format(INITIAL_USERNAME))
        initial_person = models.Players(username=INITIAL_USERNAME, score=100)
        print(initial_person)
        self.initial_db_mock = {initial_person.username:initial_person.score}
    
    def mocked_db_session_add(self,player):
        self.initial_db_mock.update(player)
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_person_query_all(self):
        pass
    def mocked_get_leader(self, userList):
        return self.initial_db_mock
        
    def test_success(self):
        for test in self.success_test_params:
            with patch('app.db.session.add', self.mocked_db_session_add):
                with patch('app.db.session.commit', self.mocked_db_session_commit):
                    with patch('app.my_order_by', self.mocked_person_query_all):
                        with patch('app.get_leader', self.mocked_get_leader):
                            
                            
                            print(self.initial_db_mock)
                            player={ test[KEY_INPUT]: test[KEY_SCORE]}
                            actual_result = add_player(player)
                            
                            print(f"The actual one is: {actual_result}")
                            expected_result = test[KEY_EXPECTED]
                            print(f"The expect one is: {expected_result}")
                            self.assertEqual(len(actual_result), len(expected_result))
                            self.assertEqual(actual_result, expected_result)
                    
            



if __name__ == '__main__':
    unittest.main()
    
    